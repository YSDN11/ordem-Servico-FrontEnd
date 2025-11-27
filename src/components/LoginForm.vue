<template>
    <div>
        <h4 class="mb-1 fw-semibold">Bem-vindo</h4>
        <p class="text-muted mb-4">
            Entre com suas credenciais para acessar o sistema.
        </p>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control rounded-3" placeholder="seu@email.com"
                    required />
            </div>

            <div class="mb-4">
                <label class="form-label">Senha</label>
                <input type="password" v-model="password" class="form-control rounded-3"
                    placeholder="Digite sua senha" required />
            </div>

            <button type="submit" class="btn btn-primary btn-md w-100 rounded-3">
                Entrar
            </button>
        </form>
    </div>
</template>

<script>
import api from '../services/api.js';

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            loading: false,
            error: '',
        };
    },
    methods: {
        async handleSubmit() {
            // this.error = '';
            // this.loading = true;

            // try{
            //     const res = await api.post('/login', {
            //         email: this.email,
            //         password: this.password
            //     });


            // }
            // catch(e){

            // }
            const nome = this.email || 'Usuário';
            this.$emit('update-user-name', nome);
            this.$router.push('/orders');
        }
    }
};
</script>