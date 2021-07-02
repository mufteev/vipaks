<template>
  <div>
    <div class="d-flex repository">
      <a :href="html_url"
         target="_blank"
         class="text-decoration-none link-primary">
        {{ name }}
      </a>
      <div class="m-sm-0 m-2">
        <a :href="clone_url"
           class="btn btn-sm btn-outline-secondary"
           target="_blank">Клонировать</a>
      </div>
    </div>
    <div class="m-2">
      <span class="create_at_txt">Дата создания: {{ created_at }}</span>
      <br>
      <span class="create_at_txt">ЯП: {{ langs }}</span>
    </div>

    <div class="m-2">
      {{ description }}
    </div>
  </div>
</template>

<script>
import { toDate, bytesToSize } from '@/util';

// Composition API
export default {
  props: {
    repository: Object
  },
  setup({ repository }) {
    return {
      name       : repository.name,
      html_url   : repository.html_url,
      clone_url  : repository.clone_url,
      description: repository.description,
      created_at : toDate(repository.created_at),
      langs      : Object
        .entries(repository.langs)
        .map(([k, v]) => `${k} (${bytesToSize(v)})`)
        .join(', ')
    };
  }
};
</script>

<style lang="scss" scoped>
.repository {
  flex-direction: column;
  justify-content: start;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.create_at_txt {
  color: dimgray;
  font-size: smaller;
}
</style>
