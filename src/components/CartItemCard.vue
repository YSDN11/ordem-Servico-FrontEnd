<template>
    <div class="card shadow-sm border-0 mb-3" style="border-radius: 18px;">
        <div class="card-body p-4">
            <!-- Cabeçalho -->
            <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h5 class="mb-1 fw-semibold">Ordem de Serviço</h5>
                    <small class="text-muted d-block">
                        Técnico: {{ userName || '—' }}
                    </small>
                </div>
                <div class="text-end">
                    <small class="text-muted d-block">
                        #{{ item.id }}
                    </small>
                </div>
            </div>

            <!-- Descrição -->
            <div class="mb-3">
                <div class="d-flex align-items-center gap-2 mb-1">
                    <i class="bi bi-file-earmark-text text-primary"></i>
                    <span class="fw-semibold">Descrição</span>
                </div>
                <div class="bg-light rounded-3 px-3 py-2">
                    <small class="text-muted d-block mb-1">Detalhes</small>
                    <span>{{ item.descricao || '—' }}</span>
                </div>
            </div>

            <!-- Checklist -->
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-ui-checks-grid text-success"></i>
                        <span class="fw-semibold">Checklist</span>
                    </div>
                    <small class="text-muted">
                        {{ completadas }} de {{ totalTarefas }} completos
                    </small>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-teal" role="progressbar" :style="{ width: progresso + '%' }"
                        :aria-valuenow="progresso" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <!-- Fotos -->
            <div>
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-images text-info"></i>
                    <span class="fw-semibold">
                        {{ item.qtdFotos }} foto(s) anexada(s)
                    </span>
                </div>
            </div>

            <div class="mt-3 d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="$emit('editar', item)">
                    Editar
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="$emit('excluir', item)">
                    Excluir
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartItemCard',
    props: {
        item: {
            type: Object,
            required: true
        },
        userName: {
            type: String,
            default: ''
        }
    },
    computed: {
        totalTarefas() {
            return this.item.totalTarefas || 0;
        },
        completadas() {
            return this.item.tarefasConcluidasIds
                ? this.item.tarefasConcluidasIds.length
                : 0;
        },
        progresso() {
            if (!this.totalTarefas) return 0;
            return Math.round((this.completadas / this.totalTarefas) * 100);
        }
    }
};
</script>

<style scoped>
.bg-teal {
    background-color: #20c997;
}
</style>