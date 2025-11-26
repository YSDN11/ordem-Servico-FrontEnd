<template>
  <div class="d-flex flex-column min-vh-100" style="background-color: #e5e9f2;">
    <div class="container d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">

      <div class="mb-4 text-center">
        <div class="d-inline-flex align-items-center justify-content-center rounded-4 mb-3"
          style="width: 60px; height: 60px; background: #0d6efd1a;">
          <i class="bi bi-clipboard-check text-primary fs-2"></i>
        </div>
        <h2 class="fw-bold mb-1">Ordem de Servico Web</h2>
        <p class="text-muted mb-0">
          Gestão de Ordens de Serviço
        </p>
      </div>

      <div class="card shadow-sm border-0 mb-4" style="max-width: 460px; width: 100%; border-radius: 18px;">
        <div class="card-body p-4 p-md-5">
          <LoginForm @update-user-name="$emit('update-user-name', $event)" />
        </div>
      </div>

      <div class="row text-center g-3 justify-content-center" style="max-width: 600px; width: 100%;">
        <div class="col-4">
          <div class="p-3 rounded-4 bg-white shadow-sm">
            <i class="bi bi-clipboard-check text-primary fs-4 mb-2 d-block"></i>
            <small class="fw-semibold d-block">Gestão Fácil</small>
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 rounded-4 bg-white shadow-sm">
            <i class="bi bi-lightning-charge text-success fs-4 mb-2 d-block"></i>
            <small class="fw-semibold d-block">Rápido</small>
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 rounded-4 bg-white shadow-sm">
            <i class="bi bi-shield-check text-warning fs-4 mb-2 d-block"></i>
            <small class="fw-semibold d-block">Seguro</small>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: { LoginForm }
};
</script>
