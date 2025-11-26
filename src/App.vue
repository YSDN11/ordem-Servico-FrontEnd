<template>
  <router-view
    :carrinho="carrinho"
    :user-name="userName"
    @update-carrinho="carrinho = $event"
    @update-user-name="userName = $event"
  />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      carrinho: [],
      userName: ''
    };
  }
};
</script>
