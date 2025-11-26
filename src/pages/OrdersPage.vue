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

      <p v-if="erro" class="text-danger">{{ erro }}</p>
      <p v-if="carregando" class="text-muted">Carregando ordens...</p>

      <div v-if="!carregando && !ordersEnriquecidas.length" class="alert alert-info">
        Nenhuma ordem cadastrada até o momento.
      </div>

      <div v-else>
        <CartItemCard v-for="item in ordersEnriquecidas" :key="item.id" :item="item" :userName="userName"
          @editar="editarOrdem" @excluir="confirmarExclusao" />
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

export default {
  name: 'OrdersPage',
  components: { TopNavbar, CartItemCard },
  props: {
    userName: { type: String, default: '' }
  },
  data() {
    return {
      apiBase: 'http://localhost:3001',
      orders: [],
      tasks: [],
      ordemParaExcluir: null,
      carregando: false,
      erro: ''
    };
  },
  computed: {
    ordersEnriquecidas() {
      if (!this.tasks.length) return [];

      return this.orders.map(order => {
        const tarefasMarcadas = (order.tarefasIds || []).map(id => {
          const t = this.tasks.find(task => task.id === id);
          return t ? t.titulo : '';
        }).filter(Boolean);

        return {
          ...order,
          tarefasMarcadas,
          totalTarefas: this.tasks.length
        };
      });
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

        const [resOrders, resTasks] = await Promise.all([
          fetch(`${this.apiBase}/orders`),
          fetch(`${this.apiBase}/tasks`)
        ]);

        if (!resOrders.ok || !resTasks.ok) {
          throw new Error('Erro ao buscar dados');
        }

        this.orders = await resOrders.json();
        this.tasks = await resTasks.json();
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
        const res = await fetch(`${this.apiBase}/orders/${id}`, {
          method: 'DELETE'
        });

        if (!res.ok) {
          throw new Error('DELETE falhou');
        }

        // recarrega do servidor
        await this.carregarDados();
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao excluir a ordem.';
      } finally {
        // garante que o modal sempre fecha
        this.ordemParaExcluir = null;
      }
    }
  }
};
</script>
