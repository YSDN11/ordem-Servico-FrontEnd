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

            <DescriptionBox v-model="form" />

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

export default {
    name: 'CreateOrderPage',
    components: { TopNavbar, DescriptionBox },
    props: {
        userName: { type: String, default: '' }
    },
    data() {
        return {
            apiBase: 'http://localhost:3001',
            form: {
                nome: '',
                endereco: '',
                cliente: '',
                descricao: ''
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
                descricao: ''
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
            if (!this.validar()) return;

            const payload = {
                nome: this.form.nome,
                endereco: this.form.endereco,
                cliente: this.form.cliente,
                descricao: this.form.descricao,
                tarefasIds: [],
                tarefasConcluidasIds: [],
                qtdFotos: 0,
                fotos: []
            };

            try {
                const res = await fetch(`${this.apiBase}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    this.erro = 'Erro ao salvar a ordem.';
                    this.sucesso = '';
                    return;
                }

                const criada = await res.json(); // id pode vir "5857" ou "dff8"
                const idStr = String(criada.id);

                this.sucesso = `Ordem #${idStr} criada com sucesso.`;
                this.limpar();

                setTimeout(() => {
                    this.$router.push({ path: '/editOrder', query: { id: idStr } });
                }, 500);
            } catch (e) {
                console.error(e);
                this.erro = 'Erro ao comunicar com a API.';
                this.sucesso = '';
            }
        }
    }
};
</script>