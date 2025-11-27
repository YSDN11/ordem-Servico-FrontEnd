<template>
  <div class="min-vh-100" style="background-color: #e5e9f2;">
    <TopNavbar :userName="userName" :cartCount="orders.length" />

    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 class="mb-1 fw-bold">Ordens de Serviço</h4>
          <p class="text-muted mb-0">
            Visualize, edite ou exclua as ordens cadastradas.
          </p>
        </div>

        <button type="button" class="btn btn-primary" @click="$router.push('/createOrder')">
          Nova Ordem
        </button>
      </div>

      <!-- Filtro e paginação (configuração) -->
      <div class="d-flex flex-wrap gap-3 mb-3 align-items-end">
        <div style="max-width: 280px; width: 100%;">
          <label class="form-label mb-1">Buscar por título</label>
          <input type="text" v-model="filtroTitulo" class="form-control"
            placeholder="Digite parte do título da ordem" />
        </div>

        <div>
          <label class="form-label mb-1">Itens por página</label>
          <select v-model.number="itensPorPagina" class="form-select">
            <option v-for="opt in itensPorPaginaOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>

        <div class="ms-auto" v-if="ordersEnriquecidas.length">
          <small class="text-muted">
            Página {{ paginaAtual }} de {{ totalPaginas }}
          </small>
        </div>
      </div>

      <p v-if="erro" class="text-danger">{{ erro }}</p>
      <p v-if="carregando" class="text-muted">Carregando ordens...</p>

      <div v-if="!carregando && !ordersEnriquecidas.length" class="alert alert-info">
        Nenhuma ordem cadastrada até o momento.
      </div>

      <div v-else>
        <CartItemCard v-for="item in ordersPaginadas" :key="item.id" :item="item" :userName="userName"
          @editar="editarOrdem" @excluir="confirmarExclusao" />
      </div>

      <!-- Controles de página -->
      <div v-if="ordersEnriquecidas.length" class="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button type="button" class="btn btn-outline-secondary btn-sm" :disabled="paginaAtual === 1"
          @click="irParaPagina(paginaAtual - 1)">
          Anterior
        </button>

        <span> Página {{ paginaAtual }} / {{ totalPaginas }} </span>

        <button type="button" class="btn btn-outline-secondary btn-sm" :disabled="paginaAtual === totalPaginas"
          @click="irParaPagina(paginaAtual + 1)">
          Próxima
        </button>
      </div>

      <!-- Modal de confirmação -->
      <div v-if="ordemParaExcluir"
        class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style="background: rgba(0,0,0,0.35); z-index: 1050;">
        <div class="card shadow-sm" style="max-width: 400px; width: 100%;">
          <div class="card-body">
            <h5 class="card-title mb-3">Excluir ordem?</h5>
            <p class="card-text">
              Tem certeza que deseja excluir esta ordem de serviço?
            </p>
            <div class="d-flex justify-content-end gap-2 mt-3">
              <button type="button" class="btn btn-outline-secondary" @click="ordemParaExcluir = null">
                Não
              </button>
              <button type="button" class="btn btn-danger" @click="excluirConfirmado">
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TopNavbar from '../components/TopNavbar.vue';
import CartItemCard from '../components/CartItemCard.vue';
import { getOrdersAndTasks, deleteOrder } from '../services/orderService';

export default {
  name: 'OrdersPage',
  components: { TopNavbar, CartItemCard },
  props: {
    userName: { type: String, default: '' }
  },
  data() {
    return {
      orders: [],
      tasks: [],
      ordemParaExcluir: null,
      carregando: false,
      erro: '',
      filtroTitulo: '',
      itensPorPaginaOptions: [5, 10, 15, 20],
      itensPorPagina: 5,
      paginaAtual: 1
    };
  },
  computed: {
    ordersFiltradas() {
      const termo = this.filtroTitulo.trim().toLowerCase();
      if (!termo) return this.orders;
      return this.orders.filter(order =>
        String(order.nome || '')
          .toLowerCase()
          .includes(termo)
      );
    },
    ordersEnriquecidas() {
      if (!this.tasks.length) return [];
      return this.ordersFiltradas.map(order => {
        const tarefasMarcadas = (order.tarefasIds || [])
          .map(id => {
            const t = this.tasks.find(task => task.id === id);
            return t ? t.titulo : '';
          })
          .filter(Boolean);

        return {
          ...order,
          tarefasMarcadas,
          totalTarefas: this.tasks.length
        };
      });
    },
    totalPaginas() {
      if (!this.ordersEnriquecidas.length) return 1;
      return Math.ceil(this.ordersEnriquecidas.length / this.itensPorPagina);
    },
    ordersPaginadas() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;
      return this.ordersEnriquecidas.slice(inicio, fim);
    }
  },
  watch: {
    filtroTitulo() {
      this.paginaAtual = 1;
    },
    itensPorPagina() {
      this.paginaAtual = 1;
    }
  },
  mounted() {
    this.carregarDados();
  },
  methods: {
    async carregarDados() {
      try {
        this.carregando = true;
        this.erro = '';

        const { orders, tasks } = await getOrdersAndTasks();
        this.orders = orders;
        this.tasks = tasks;
      } catch (e) {
        console.error(e);
        this.erro = 'Não foi possível carregar as ordens de serviço.';
      } finally {
        this.carregando = false;
      }
    },
    editarOrdem(item) {
      const idStr = String(item.id);
      this.$router.push({ path: '/editOrder', query: { id: idStr } });
    },
    confirmarExclusao(item) {
      this.ordemParaExcluir = item;
    },
    async excluirConfirmado() {
      const id = String(this.ordemParaExcluir.id);
      console.log('DELETE ordem id =', id);

      try {
        await deleteOrder(id);
        await this.carregarDados();
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao excluir a ordem.';
      } finally {
        this.ordemParaExcluir = null;
      }
    },
    irParaPagina(p) {
      if (p < 1 || p > this.totalPaginas) return;
      this.paginaAtual = p;
    }
  }
};
</script>
