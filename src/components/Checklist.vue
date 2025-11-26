<template>
  <div class="card shadow-sm border-0 mb-4 p-3" style="border-radius: 18px;">
    <div class="card-header bg-white border-0 d-flex align-items-center gap-2" style="border-radius: 18px 18px 0 0;">
      <div class="d-inline-flex align-items-center justify-content-center rounded-3"
        style="width: 32px; height: 32px; background: #0d6efd1a;">
        <i class="bi bi-list-check text-primary"></i>
      </div>
      <div>
        <h5 class="mb-0 fw-semibold">Checklist</h5>
        <small class="text-muted">
          Selecione as tarefas que fazem parte da ordem.
        </small>
      </div>
    </div>

    <div class="card-body p-4">
      <div v-for="tarefa in localTarefas" :key="tarefa.id" class="form-check mb-1">
        <input class="form-check-input" type="checkbox" :id="'tarefa-' + tarefa.id" v-model="tarefa.concluida"
          :disabled="readonly" />
        <label class="form-check-label" :for="'tarefa-' + tarefa.id">
          {{ tarefa.titulo }}
        </label>
      </div>

      <p v-if="!localTarefas.length" class="text-muted mb-0">
        Nenhuma tarefa cadastrada.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistBox',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localTarefas: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  }
};
</script>
