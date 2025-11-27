<template>
    <div>
        <h4 class="mb-1 fw-semibold">Bem-vindo</h4>
        <p class="text-muted mb-4">
            Entre com suas credenciais para acessar o sistema.
        </p>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label class="form-label">Usuário ou e-mail</label>
                <input type="text" v-model="userNameOrEmail" class="form-control rounded-3"
                    placeholder="Usuário ou email" required />
            </div>

            <div class="mb-4">
                <label class="form-label">Senha</label>
                <input type="password" v-model="password" class="form-control rounded-3" placeholder="Digite sua senha"
                    required />
            </div>

            <p v-if="error" class="text-danger small mb-3">{{ error }}</p>

            <button type="submit" class="btn btn-primary btn-md w-100 rounded-3" :disabled="loading">
                {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
        </form>
    </div>
</template>

<script>
import api from '../services/api';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export default {
    name: 'LoginForm',
    data() {
        return {
            userNameOrEmail: '',
            password: '',
            loading: false,
            error: ''
        };
    },
    methods: {
        async handleSubmit() {
            this.error = '';
            this.loading = true;

            try {
                const { data } = await api.post('/auth/login', {
                    userNameOrEmail: this.userNameOrEmail,
                    password: this.password
                });

                const { token, user } = data;

                localStorage.setItem(TOKEN_KEY, token);
                localStorage.setItem(USER_KEY, JSON.stringify(user));

                const nome =
                    (user && (user.userName || user.username || user.email)) ||
                    this.userNameOrEmail ||
                    'Usuário';

                this.$emit('update-user-name', nome);
                this.$router.push('/orders');

            } catch (e) {
                console.error(e);
                this.error = 'Usuário ou senha inválidos.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>