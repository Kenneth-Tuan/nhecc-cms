<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { articlesTable } from ".";

const dummyPDFUrl = "https://nhecc.tw/user/hymn/hymn/mix_pdf_lyrics/2907";

const route = useRoute();
const articleId = computed(() => route.params.id);
const articleTitle = computed(
  () => articlesTable.find((article) => article.key === articleId.value)?.title
);
const articleRef = ref(null);
const url = computed(() => {
  if (import.meta.env.DEV) {
    return `/src/articles/${articleTitle.value?.toString()}.pdf`;
  } else {
    return `/holypinecare/articles/${articleTitle.value?.toString()}.pdf`;
  }
});
const current = ref(1);
const pageCount = ref(0);

let pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 2;

watch(
  () => {
    route.params;
  },
  () => {
    getPDFDocument();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  // getPDFDocument();
});

/**
 * Asynchronously downloads PDF.
 */
function getPDFDocument() {
  pdfjsLib.getDocument(url.value).promise.then(function (pdfDoc_) {
    pdfDoc = pdfDoc_;
    pageCount.value = pdfDoc.numPages;
    // Initial/first page rendering
    renderPage(pageNum);
  });
}

function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    let canvas = articleRef.value;
    let ctx = canvas.getContext("2d");
    var viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    // canvas.style = { "background-color": rgba(255, 0, 0, 0.5) };
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

function onChange() {
  window.scrollTo(0, 0);
  queueRenderPage(current.value);
}
</script>

<template>
  <div class="article-wrapper pb-12">
    <div class="flex flew-row justify-center mb-12">
      <canvas ref="articleRef" id="article" class="rounded-lg"></canvas>
    </div>

    <div class="flex flex-row justify-center">
      <a-pagination
        v-model:current="current"
        :total="Number(pageCount)"
        :pageSize="1"
        show-less-items
        @change="onChange()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-wrapper {
  :deep() {
    .ant-pagination {
      &-prev,
      &-item,
      &-item-link,
      &-next {
        background-color: rgba($color: #ffffff, $alpha: 0.2);
      }
    }
  }
}
</style>
