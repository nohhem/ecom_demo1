<template>
  <div class="overflow-auto">
    <!-- Use text in props -->
    <b-pagination-nav
      number-of-pages="10"
      base-url="#"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    ></b-pagination-nav>

    <!-- Use emojis in props -->
    <b-pagination-nav
      number-of-pages="10"
      base-url="#"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination-nav>

    <!-- Use HTML and sub-components in slots -->
    <b-pagination-nav number-of-pages="10" base-url="#" class="mt-4">
      <template v-slot:first-text>
        <span class="text-success">First</span>
      </template>
      <template v-slot:prev-text>
        <span class="text-danger">Prev</span>
      </template>
      <template v-slot:next-text>
        <span class="text-warning">Next</span>
      </template>
      <template v-slot:last-text>
        <span class="text-info">Last</span>
      </template>
      <template v-slot:ellipsis-text>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
      </template>
      <template v-slot:page="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else>{{ page }}</i>
      </template>
    </b-pagination-nav>
  </div>
</template>