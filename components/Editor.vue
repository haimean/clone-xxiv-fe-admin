<template>
  <client-only>
    <div class="content">
      <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-bind="$attrs"
        v-on="$listeners"
      ></ckeditor>
    </div>
  </client-only>
</template>

<script>
let ClassicEditor;
let CKEditor;

if (process.client) {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  CKEditor = require("@ckeditor/ckeditor5-vue2");
} else {
  CKEditor = { component: { template: "<div></div>" } };
}
export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        language: "jp",
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "outdent",
            "indent",
            "|",
            "todoList",
            "link",
            "blockQuote",
            "insertTable",
            "|",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: true,
        },
      },
    };
  },
};
</script>
<style lang="scss">
.ck-editor__editable {
  height: 720px;
}
</style>
