<template>
    <div>
        <h4 class="mb-1 fw-semibold">Novo Usuário</h4>
        <p class="text-muted mb-4">Defina usuário, e-mail, senha e cargo.</p>

        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label class="form-label">Nome de usuário</label>
                <input type="text" v-model="userName" class="form-control rounded-3" placeholder="usuario123"
                    required />
            </div>

            <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input type="email" v-model="email" class="form-control rounded-3" placeholder="usuario@exemplo.com"
                    required />
            </div>

            <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" v-model="password" class="form-control rounded-3" placeholder="Digite a senha"
                    required />
            </div>

            <div class="mb-4">
                <label class="form-label">Cargo</label>
                <select v-model="role" class="form-select rounded-3" required>
                    <option value="tecnico">Técnico</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <p v-if="error" class="text-danger small mb-3">{{ error }}</p>
            <p v-if="success" class="text-success small mb-3">{{ success }}</p>

            <div class="d-flex gap-2">
                <button type="button" class="btn btn-outline-secondary btn-md w-50 rounded-3" @click="goBack">
                    Voltar
                </button>
                <button type="submit" class="btn btn-primary btn-md w-50 rounded-3" :disabled="loading">
                    {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
                </button>

            </div>
        </form>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'RegisterForm',
    data() {
        return {
            userName: '',
            email: '',
            password: '',
            role: 'tecnico',
            loading: false,
            error: '',
            success: ''
        };
    },
    methods: {
        async handleSubmit() {
            this.error = '';
            this.success = '';
            this.loading = true;

            try {
                await api.post('/auth/register', {
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                    role: this.role
                });

                this.success = 'Usuário criado com sucesso!';

                setTimeout(() => {
                    this.$emit('registration-success');
                }, 1500);
            } catch (e) {
                console.error(e);
                this.error = e.response?.data?.message || 'Erro ao cadastrar usuário.';
            } finally {
                this.loading = false;
            }
        },
        goBack() {
            this.$router.push('/orders');
        }
    }
};
</script>