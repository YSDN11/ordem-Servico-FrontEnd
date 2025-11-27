<template>
  <div class="min-vh-100" style="background-color: #e5e9f2;">
    <TopNavbar :userName="userName" :cartCount="0" />

    <div class="container py-4">
      <div class="mb-3">
        <h2 class="fw-bold mb-1">Nova Ordem de Serviço</h2>
        <p class="text-muted mb-0">
          Preencha os dados principais da ordem de serviço.
        </p>
      </div>

      <DescriptionBox v-model="form" :disabled="false" :showExtraField="false" :allowExtraField="false" />

      <p v-if="erro" class="text-danger mb-2">{{ erro }}</p>
      <p v-if="sucesso" class="text-success mb-2">{{ sucesso }}</p>

      <div class="d-flex gap-2 mt-3">
        <button type="button" class="btn btn-secondary" @click="limpar">
          Limpar
        </button>
        <button type="button" class="btn btn-primary" @click="criarOrdem">
          Salvar ordem
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from '../components/TopNavbar.vue';
import DescriptionBox from '../components/DescriptionBox.vue';
import { createOrder } from '../services/createOrderService';

export default {
  name: 'CreateOrderPage',
  components: { TopNavbar, DescriptionBox },
  props: {
    userName: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        nome: '',
        endereco: '',
        cliente: '',
        descricao: '',
        observacoesTecnico: ''
      },
      erro: '',
      sucesso: ''
    };
  },

  methods: {
    limpar() {
      this.form = {
        nome: '',
        endereco: '',
        cliente: '',
        descricao: '',
        observacoesTecnico: ''
      };
      this.erro = '';
      this.sucesso = '';
    },
    validar() {
      if (!this.form.nome.trim()) {
        this.erro = 'Preencha o campo "Nome".';
        this.sucesso = '';
        return false;
      }
      if (!this.form.endereco.trim()) {
        this.erro = 'Preencha o campo "Endereço".';
        this.sucesso = '';
        return false;
      }
      if (!this.form.cliente.trim()) {
        this.erro = 'Preencha o campo "Cliente".';
        this.sucesso = '';
        return false;
      }
      if (!this.form.descricao.trim()) {
        this.erro = 'Preencha o campo "Descrição".';
        this.sucesso = '';
        return false;
      }
      this.erro = '';
      return true;
    },
    async criarOrdem() {
      console.log(JSON.stringify(this.form))
      if (!this.validar()) return;

      const payload = {
        nome: this.form.nome,
        endereco: this.form.endereco,
        cliente: this.form.cliente,
        descricao: this.form.descricao,
        observacoesTecnico: this.form.observacoesTecnico
      };

      try {
        const ordemCriada = await createOrder(payload);
        console.log('ordemCriada', ordemCriada);

        if (!ordemCriada || typeof ordemCriada.id === 'undefined') {
          this.erro = 'Resposta da API não contém id da ordem.';
          return;
        }

        this.sucesso = 'Ordem criada com sucesso!';
        this.$router.push('/orders');
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao comunicar com a API.';
      }
    }
  }
};
</script>
