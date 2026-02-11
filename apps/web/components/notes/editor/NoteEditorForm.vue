<template>
  <div v-if="editor" class="flex flex-col gap-6">
    <AppFormField :label="copy.noteEditor.titleLabel" class="w-full">
      <AppInput
        v-model="editor.localTitle"
        type="text"
        :placeholder="copy.noteEditor.titlePlaceholder"
        @focus="editor.pushState()"
      />
    </AppFormField>
    <div>
      <div class="flex items-center justify-between gap-2 mb-3">
        <h2 class="m-0 text-base font-semibold text-highlighted">{{ copy.noteEditor.todosTitle }}</h2>
        <AppButton
          variant="secondary"
          type="button"
          class="shrink-0 w-9 h-9 p-0 inline-flex items-center justify-center"
          :aria-label="copy.noteEditor.addTodo"
          @click="editor.addTodo()"
        >
          <UIcon name="i-lucide-plus" class="size-5" aria-hidden />
        </AppButton>
      </div>
      <ul class="m-0 mb-4 p-0 list-none">
        <TodoItemRow
          v-for="(todo, index) in editor.localTodos"
          :key="todo.id || `${editor.NEW_TODO_KEY_PREFIX}${index}`"
          :model-value="todo"
          :index="index"
          @update:model-value="editor.setTodoAt(index, $event)"
          @remove="editor.removeTodoAt(index)"
          @focus="editor.pushState()"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { NOTE_EDITOR_KEY } from '~/composables/notes/useNoteEditor'

defineOptions({ name: 'NoteEditorForm' })

const copy = useCopy()
const editor = inject(NOTE_EDITOR_KEY)
</script>
