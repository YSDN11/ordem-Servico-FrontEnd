<template>
  <div class="card shadow-sm border-0 mb-4 p-3" style="border-radius: 18px;">
    <div class="card-header bg-white border-0 d-flex align-items-center gap-2" style="border-radius: 18px 18px 0 0;">
      <div class="d-inline-flex align-items-center justify-content-center rounded-3"
        style="width: 32px; height: 32px; background: #20c9971a;">
        <i class="bi bi-images text-success"></i>
      </div>
      <div>
        <h5 class="mb-0 fw-semibold">Fotos</h5>
        <small class="text-muted">
          Adicione fotos.
        </small>
      </div>
    </div>

    <div class="card-body p-4">
      <div class="mb-3">
        <input type="file" class="form-control" accept="image/*" multiple @change="onFilesSelected" />
      </div>

      <div v-if="localFotos.length">
        <p class="mb-2 text-muted">
          {{ localFotos.length }} foto(s) selecionada(s):
        </p>
        <div class="d-flex flex-wrap gap-2">
          <div v-for="(foto, index) in localFotos" :key="index" class="border rounded-3 p-1" style="width: 100px;">
            <img :src="foto.data" :alt="foto.nome" class="img-fluid rounded-2 mb-1" />
            <small class="d-block text-truncate">{{ foto.nome }}</small>
            <button type="button" class="btn btn-sm btn-outline-danger w-100 mt-1" @click="removerFoto(index)">
              Remover
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-muted mb-0">
        Nenhuma foto selecionada.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoBox',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    localFotos: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
  methods: {
    onFilesSelected(event) {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const base64 = e.target.result;
          this.localFotos = [
            ...this.localFotos,
            { nome: file.name, data: base64 }
          ];
        };
        reader.readAsDataURL(file);
      });

      event.target.value = '';
    },
    removerFoto(index) {
      const updated = [...this.localFotos];
      updated.splice(index, 1);
      this.localFotos = updated;
    }
  }
};
</script>
