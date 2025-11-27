<template>
  <div class="min-vh-100" style="background-color: #e5e9f2;">
    <TopNavbar :userName="userName" :cartCount="0" />

    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 class="mb-1 fw-bold">Gerenciar Tarefas</h4>
          <p class="text-muted mb-0">
            Cadastre, edite ou remova as tarefas usadas no checklist das ordens.
          </p>
        </div>

        <button type="button" class="btn btn-outline-secondary rounded-4 d-flex align-items-center gap-2"
          @click="$router.push('/orders')">
          <i class="bi bi-card-checklist"></i>
          <span>Ver ordens</span>
        </button>
      </div>

      <div class="card border-0 shadow-sm p-3" style="border-radius: 18px;">
        <div class="card-header bg-white border-0 d-flex align-items-center gap-2"
          style="border-radius: 18px 18px 0 0;">
          <div class="d-inline-flex align-items-center justify-content-center rounded-3"
            style="width: 32px; height: 32px; background: #0d6efd1a;">
            <i class="bi bi-journals text-primary"></i>
          </div>
          <div>
            <h6 class="mb-0 fw-semibold">Lista de tarefas</h6>
            <small class="text-muted">Essas tarefas aparecem no checklist das ordens.</small>
          </div>
        </div>

        <div class="card-body p-4">
          <div class="d-flex flex-wrap gap-2 mb-3">
            <div class="flex-grow-1">
              <input v-model="formTitulo" type="text" class="form-control"
                placeholder="Nome da tarefa (ex: Verificar equipamento)" />
            </div>
            <button class="btn btn-primary" @click="salvar">
              <i class="bi" :class="editandoId ? 'bi-pencil-square' : 'bi-plus-circle'"></i>
              <span class="ms-1">
                {{ editandoId ? 'Atualizar' : 'Adicionar' }}
              </span>
            </button>
            <button v-if="editandoId" class="btn btn-outline-secondary" @click="cancelarEdicao">
              Cancelar
            </button>
          </div>

          <p v-if="erro" class="text-danger small mb-2">{{ erro }}</p>

          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Título</th>
                  <th style="width: 180px;" class="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.id">
                  <td>{{ task.titulo }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editar(task)">
                      <i class="bi bi-pencil-square me-1"></i>
                      Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="excluir(task)">
                      <i class="bi bi-trash me-1"></i>
                      Excluir
                    </button>
                  </td>
                </tr>

                <tr v-if="!tasks.length">
                  <td colspan="3" class="text-center text-muted py-4">
                    Nenhuma tarefa cadastrada ainda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from '../components/TopNavbar.vue';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export default {
  name: 'TasksPage',
  components: { TopNavbar },
  props: {
    userName: { type: String, default: '' }
  },
  data() {
    return {
      tasks: [],
      formTitulo: '',
      editandoId: null,
      erro: ''
    };
  },
  async mounted() {
    await this.carregar();
  },
  methods: {
    async carregar() {
      try {
        this.erro = '';
        this.tasks = await getAllTasks();
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao carregar tarefas.';
      }
    },
    async salvar() {
      const titulo = this.formTitulo.trim();
      if (!titulo) return;

      try {
        if (this.editandoId) {
          await updateTask(this.editandoId, { id: this.editandoId, titulo });
        } else {
          await createTask({ titulo });
        }

        this.formTitulo = '';
        this.editandoId = null;
        await this.carregar();
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao salvar tarefa.';
      }
    },
    editar(task) {
      this.editandoId = task.id;
      this.formTitulo = task.titulo;
    },
    cancelarEdicao() {
      this.editandoId = null;
      this.formTitulo = '';
    },
    async excluir(task) {
      if (!confirm(`Excluir a tarefa "${task.titulo}"?`)) return;
      try {
        await deleteTask(task.id);
        await this.carregar();
      } catch (e) {
        console.error(e);
        this.erro = 'Erro ao excluir tarefa.';
      }
    }
  }
};
</script>
