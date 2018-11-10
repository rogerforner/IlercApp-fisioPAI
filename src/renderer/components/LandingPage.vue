<template>
  <section>
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: 'landing-page',
    data: function() {
      return { visible: false }
    }
  }
</script>