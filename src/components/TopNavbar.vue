<template>
  <header class="border-bottom bg-white">
    <div class="container d-flex align-items-center justify-content-between py-3">
      <div class="d-flex align-items-center gap-2">
        <div class="d-inline-flex align-items-center justify-content-center rounded-4"
          style="width: 40px; height: 40px; background: #0d6efd1a;">
          <i class="bi bi-clipboard-check text-primary fs-5"></i>
        </div>
        <div>
          <div class="fw-semibold">Ordem de Servico Web</div>
          <small class="text-muted">Gestão de Ordens de Serviço</small>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <div class="px-3 py-2 rounded-4 bg-light d-flex flex-column">
          <span class="fw-semibold" style="font-size: 0.9rem;">
            {{ displayName }}
          </span>
          <small class="text-muted" style="font-size: 0.75rem;">
            {{ isAdmin ? 'Admin' : 'Técnico' }}
          </small>
        </div>

        <button type="button" class="btn btn-light rounded-4 position-relative" @click="$router.push('/orders')"
          title="Ver ordens">
          <i class="bi bi-card-list fs-5"></i>
        </button>

        <!-- botão de tarefas só para admin -->
        <button v-if="isAdmin" type="button" class="btn btn-light rounded-4 position-relative"
          @click="$router.push('/tasks')" title="Ver tarefas">
          <i class="bi bi-card-checklist fs-5"></i>
        </button>

        <!-- botão de cadastro de usuários só para admin -->
        <button v-if="isAdmin" type="button" class="btn btn-light rounded-4 position-relative"
          @click="$router.push('/register')" title="Gerenciar Usuários">
          <i class="bi bi-person-plus fs-5"></i>
        </button>

        <button type="button" class="btn btn-light rounded-4 position-relative" @click="$router.push('/createOrder')"
          title="Criar ordem">
          <i class="bi bi-plus-circle fs-5"></i>
        </button>

        <button type="button" class="btn btn-light rounded-4" @click="logout" title="Sair">
          <i class="bi bi-box-arrow-right fs-5"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { getStoredUser, logout as authLogout } from '../services/authService';

export default {
  name: 'TopNavbar',
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    const u = getStoredUser();
    return {
      user: u
    };
  },
  computed: {
    isAdmin() {
      const result = this.user?.roles?.includes('admin');
        return result;
    },
    displayName() {
      return this.userName || this.user?.userName || this.user?.email || 'Usuário';
    }
  },
  watch: {
    $route() {
      const u = getStoredUser();
      this.user = u;
    }
  },
  methods: {
    logout() {
      authLogout();
      this.$router.push('/login');
    }
  }
};

</script>
