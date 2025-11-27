<template>
    <div class="d-flex flex-column min-vh-100" style="background-color: #e5e9f2;">
        <div class="container d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">
            <div class="mb-4 text-center">
                <div class="d-inline-flex align-items-center justify-content-center rounded-4 mb-3"
                    style="width: 60px; height: 60px; background: #0d6efd1a;">
                    <i class="bi bi-person-plus text-primary fs-2"></i>
                </div>
                <h2 class="fw-bold mb-1">Cadastrar Novo Usuário</h2>
                <p class="text-muted mb-0">Preencha os dados do novo usuário.</p>
            </div>

            <div class="card shadow-sm border-0 mb-4" style="max-width: 460px; width: 100%; border-radius: 18px;">
                <div class="card-body p-4 p-md-5">
                    <RegisterForm @registration-success="handleSuccess" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
    name: 'RegisterPage',
    components: { RegisterForm },
    methods: {
        handleSuccess() {
            this.$router.push('/orders');
        }
    }
};
</script>