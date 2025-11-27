<template>
  <div class="min-vh-100" style="background-color: #e5e9f2;">
    <TopNavbar :userName="userName" :cartCount="0" />

    <div class="container py-4">
      <div class="mb-3">
        <h2 class="fw-bold mb-1">Executar Ordem de Serviço</h2>
        <p class="text-muted mb-0">
          Confira os dados da ordem e marque as atividades concluídas.
        </p>
      </div>

      <DescriptionBox v-model="form" :disabled="true" :showExtraField="true" :allowExtraField="true" />
      <ChecklistBox v-model="tarefasTodas" />
      <PhotoBox v-model="fotos" />

      <p v-if="erro" class="text-danger mb-2">{{ erro }}</p>
      <p v-if="sucesso" class="text-success mb-2">{{ sucesso }}</p>

      <div class="d-flex gap-2 mt-3">
        <button type="button" class="btn btn-secondary" @click="cancelar">
          Cancelar
        </button>
        <button type="button" class="btn btn-primary" @click="salvar">
          Salvar alterações
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from '../components/TopNavbar.vue';
import DescriptionBox from '../components/DescriptionBox.vue';
import PhotoBox from '../components/Photo.vue';
import ChecklistBox from '../components/Checklist.vue';
import { getOrderAndTasksById, updateOrder } from '../services/editOrderService';

export default {
  name: 'EditOrderPage',
  components: { TopNavbar, DescriptionBox, PhotoBox, ChecklistBox },
  props: {
    userName: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        nome: '',
        endereco: '',
        cliente: '',
        descricao: ''
      },
      tarefasTodas: [],   // [{ id: string, titulo, concluida }]
      fotos: [],          // [{ nome, data }]
      ordemId: null,      // string
      erro: '',
      sucesso: '',
      originalConcluidas: [],
      originalFotosJson: '[]'
    };
  },
  async mounted() {
    const idParam = this.$route.query.id;
    const id = idParam ? String(idParam) : null;

    console.log('EditOrderPage idParam=', idParam, 'id=', id);

    if (!id) {
      this.erro = 'ID da ordem não informado.';
      return;
    }

    this.ordemId = id;
    await this.carregarDados();
  },
  methods: {
    async carregarDados() {
      try {
        console.log('carregarDados ordemId =', this.ordemId);

        const { ordem, tasks } = await getOrderAndTasksById(this.ordemId);

        this.form = {
          nome: ordem.nome || '',
          endereco: ordem.endereco || '',
          cliente: ordem.cliente || '',
          descricao: ordem.descricao || '',
          observacoesTecnico: ordem.observacoesTecnico || ''
        };

        const concluidas = (ordem.tarefasConcluidasIds || []).map(String);

        this.tarefasTodas = tasks.map(t => {
          const tid = String(t.id);
          return {
            id: tid,
            titulo: t.titulo,
            concluida: concluidas.includes(tid)
          };
        });

        this.fotos = (ordem.fotos || []).map((base64, index) => ({
          nome: `Foto ${index + 1}`,
          data: base64
        }));

        this.originalConcluidas = concluidas.slice();
        this.originalFotosJson = JSON.stringify(this.fotos);
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao carregar a ordem.';
      }
    },
    cancelar() {
      this.$router.push('/orders');
    },
    async salvar() {
      const tarefasConcluidasIds = this.tarefasTodas
        .filter(t => t.concluida)
        .map(t => String(t.id));

      const fotosAtualJson = JSON.stringify(this.fotos);

      const mudouChecklist =
        JSON.stringify(tarefasConcluidasIds.slice().sort()) !==
        JSON.stringify(this.originalConcluidas.slice().sort());
      const mudouFotos = fotosAtualJson !== this.originalFotosJson;

      if (!mudouChecklist && !mudouFotos) {
        this.sucesso = 'Nenhuma alteração para salvar.';
        this.erro = '';
        return;
      }

      try {
        await updateOrder(this.ordemId, {
          tarefasConcluidasIds,
          fotos: this.fotos.map(f => f.data),
          qtdFotos: this.fotos.length
        });

        this.sucesso = 'Alterações salvas com sucesso.';
        this.erro = '';

        setTimeout(() => {
          this.$router.push('/orders');
        }, 800);
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao comunicar com a API.';
        this.sucesso = '';
      }
    }
  }
};
</script>
