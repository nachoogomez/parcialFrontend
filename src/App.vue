<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { BookOpenIcon, HomeIcon, ShoppingBagIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'


// librerias
import Sidebar from 'primevue/sidebar'

// Parcial: instanciar nuestro useCartStore en una variable const para utilizarla en el componente
const cartStore = useCartStore();

// Parcial: obtener la cantidad de libros en carrito del cartStore y pasarlo en qty tag
const qty = ref(cartStore.getCart().length);

// Barra Lateral
const sidebarVisible = ref(false)

// Abrir / Cerrar barra lateral
function openCloseSidebar() {
  if (sidebarVisible.value === true) {
    sidebarVisible.value = false
  }
  else {
    sidebarVisible.value = true
  }
}

// Pacial: Por que uso ref para la variable sidebarVisible? 
/*Porque asi creas una referencia reactiva y poder detectar y actualizar el estado automaticamente */

// Parcial: Como accedo al valor de ref para manipular los cambios en la barra lateral?
/*A traves de la propiedad .value en la funcion openCloseSidebar */

const carts: cart[] = cartStore.getCart();


</script>

<template>
  <nav class="flex items-center justify-between flex-wrap py-6 px-10 ">
    <!-- logo -->
    <BookOpenIcon class="text-2xl size-6 text-slate-200" />

    <!-- name -->
    <div class="logo w-52 max-w-md flex text-2xl text-white font-semibold">
      <span class="text-slate-400">&lsaquo;Unknown</span>
      <span class="font-normal">Book</span>
      <span class="text-slate-400">Store&sol;&rsaquo;</span>
    </div>
    <!-- links -->
    <div class="links w-full md:w-auto md:ml-6 flex flex-row">
      <RouterLink to="/" class="text-white-600 hover:text-white-400">
        <HomeIcon class="w-6 h-6 mr-2 text-slate-200" />
      </RouterLink>
      <div class="bag-icon" @click="openCloseSidebar()">
        <!-- modificar con la cantidad de items en carro. Si el carro esta vacio. -->
        <div class="qty-tag">{{ qty }}</div>
        <ShoppingBagIcon class="w-6 mr-2 text-slate-200" />
      </div>
    </div>
  </nav>

  <Sidebar v-model:visible="sidebarVisible" position="right">
    <template #container>
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h2 class="text-2xl">Carrito</h2>
          <XCircleIcon class="h-8 w-8" @click="openCloseSidebar" />
        </div>
        <div class="item-wrapper">
          <div v-for="item in carts" :key="item.id" class="items">
            <div class="item">
              <img :src="item.coverImg" alt="">
              <div class="info">
                <div class="book-title">{{ item.title }}</div>
                <div class="price">$ {{ item.price }}.00</div>
                <button class="delete">Eliminar</button>
              </div>
            </div>
          </div>
          <div class="total">
            <div>Total</div>
            <div class="total">$ {{ carts.reduce((acc, item) => acc + item.price, 0) }}.00</div>
          </div>
        </div>
      </div>
    </template>
  </Sidebar>

  <RouterView />
</template>

<style scoped>
nav {
  background: var(--primary);
  position: fixed;
  min-width: 100vw;
  z-index: 1000;
}

.bag-icon {
  position: relative
}

.item-wrapper{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
}

.items{
  background-color: #e3e3e3;
  padding: 10px;
  border-radius: 10px;
}

.info{
  display: flex;
  flex-direction: column;
  gap: 15px;
}

img{
  max-width: 200px;
  height: 150px;
}

.item{
  display: flex;
  gap: 20px;
  
}

.qty-tag {
  position: absolute;
  display: flex;
  height: 20px;
  width: 20px;
  padding: 5px 5px;
  align-items: center;
  justify-content: center;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 12px;

}

.delete{
  background-color: red;
  padding: 5px;
  border-radius: 10px;
  color: #fff;
  width: 100px;
}


.sidebar-content {
  width: 400px;
  max-height: 100vh;
  height: 100vh;
  background: #fff;
}

.sidebar-header {
  width: 100%;
  height: 80px;
  background: var(--primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 16px;
  border: 1px solid #fff
}

.total{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.logo {
  width: 200px;

}
</style>
