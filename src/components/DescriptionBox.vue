<template>
  <div class="card shadow-sm border-0 mb-4 p-3" style="border-radius: 18px;">
    <div class="card-header bg-white border-0 d-flex align-items-center gap-2" style="border-radius: 18px 18px 0 0;">
      <div class="d-inline-flex align-items-center justify-content-center rounded-3"
        style="width: 32px; height: 32px; background: #0d6efd1a;">
        <i class="bi bi-file-earmark-text text-primary"></i>
      </div>
      <div>
        <h5 class="mb-0 fw-semibold">Dados da Ordem</h5>
        <small class="text-muted">
          Preencha as informações principais da ordem de serviço.
        </small>
      </div>
    </div>

    <div class="card-body p-4">
      <div class="mb-3">
        <label class="form-label">Titulo</label>
        <input type="text" v-model="localForm.nome" class="form-control" placeholder="Digite o título da ordem"
          :disabled="disabled" />
      </div>

      <div class="mb-3">
        <label class="form-label">Endereço</label>
        <input type="text" v-model="localForm.endereco" class="form-control" placeholder="Digite o endereço"
          :disabled="disabled" />
      </div>

      <div class="mb-3">
        <label class="form-label">Cliente</label>
        <input type="text" v-model="localForm.cliente" class="form-control" placeholder="Nome do cliente"
          :disabled="disabled" />
      </div>

      <div class="mb-0">
        <label class="form-label">Descrição</label>
        <textarea v-model="localForm.descricao" class="form-control" rows="4" placeholder="Descreva o serviço"
          :disabled="disabled"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionBox',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localForm: {
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
