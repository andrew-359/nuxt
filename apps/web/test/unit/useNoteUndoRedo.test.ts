/**
 * Unit tests for useNoteUndoRedo: undo/redo stack, dedupe, clearHistory, keydown.
 */
import { describe, it, expect } from "vitest";
import { ref } from "vue";
import { useNoteUndoRedo } from "../../composables/notes/useNoteUndoRedo";

function makeTodo(
  id: string,
  text: string,
  completed = false,
  order = 0,
): { id: string; text: string; completed: boolean; order: number } {
  return { id, text, completed, order };
}

describe("useNoteUndoRedo", () => {
  it("pushState pushes snapshot and clears future", () => {
    const title = ref("A");
    const todos = ref([makeTodo("1", "task", false, 0)]);
    const { pushState, undo, canUndo, canRedo } = useNoteUndoRedo(title, todos);

    expect(canUndo.value).toBe(false);
    expect(canRedo.value).toBe(false);

    pushState(); // save A (before edit)
    title.value = "B";
    pushState(); // save B (before next edit)

    expect(canUndo.value).toBe(true);
    expect(canRedo.value).toBe(false);

    undo(); // restore B (no change)
    expect(title.value).toBe("B");
    expect(canUndo.value).toBe(true);
    expect(canRedo.value).toBe(true);

    undo(); // restore A
    expect(title.value).toBe("A");
    expect(canUndo.value).toBe(false);
  });

  it("does not push duplicate snapshot (same as last in past)", () => {
    const title = ref("Same");
    const todos = ref([makeTodo("1", "x", false, 0)]);
    const { pushState, undo, canUndo } = useNoteUndoRedo(title, todos);

    pushState();
    pushState(); // same state again
    pushState(); // same again

    expect(canUndo.value).toBe(true);
    undo();
    expect(title.value).toBe("Same");
    expect(canUndo.value).toBe(false);
  });

  it("redo restores from future and clears future on new pushState", () => {
    const title = ref("1");
    const todos = ref([makeTodo("a", "t", false, 0)]);
    const { pushState, undo, redo, canRedo } = useNoteUndoRedo(title, todos);

    pushState();
    title.value = "2";
    pushState();
    title.value = "3";

    undo();
    undo();
    expect(title.value).toBe("1");
    expect(canRedo.value).toBe(true);

    redo();
    expect(title.value).toBe("2");
    redo();
    expect(title.value).toBe("3");
    expect(canRedo.value).toBe(false);

    pushState(); // new edit
    expect(canRedo.value).toBe(false);
  });

  it("clearHistory clears past and future", () => {
    const title = ref("X");
    const todos = ref([makeTodo("1", "y", false, 0)]);
    const { pushState, undo, redo, clearHistory, canUndo, canRedo } =
      useNoteUndoRedo(title, todos);

    pushState();
    title.value = "Y";
    pushState();
    undo();
    expect(canUndo.value).toBe(true);
    expect(canRedo.value).toBe(true);

    clearHistory();
    expect(canUndo.value).toBe(false);
    expect(canRedo.value).toBe(false);
    undo();
    redo();
    expect(title.value).toBe("Y");
  });

  it("calls onApply when applying snapshot (undo/redo)", () => {
    const title = ref("A");
    const todos = ref([makeTodo("1", "t", false, 0)]);
    let applyCount = 0;
    const { pushState, undo } = useNoteUndoRedo(title, todos, {
      onApply: () => {
        applyCount += 1;
      },
    });

    pushState();
    title.value = "B";
    expect(applyCount).toBe(0);
    undo();
    expect(applyCount).toBe(1);
    expect(title.value).toBe("A");
  });

  it("handleKeydown triggers undo on Ctrl+Z and redo on Ctrl+Shift+Z / Ctrl+Y", () => {
    const title = ref("U");
    const todos = ref([makeTodo("1", "x", false, 0)]);
    const { pushState, handleKeydown } = useNoteUndoRedo(title, todos);

    pushState();
    title.value = "V";

    const preventDefault = () => {};
    // Ctrl+Z: undo once -> back to U
    handleKeydown({
      key: "z",
      ctrlKey: true,
      shiftKey: false,
      metaKey: false,
      preventDefault,
    } as KeyboardEvent);
    expect(title.value).toBe("U");

    // Ctrl+Shift+Z: redo -> V
    handleKeydown({
      key: "z",
      ctrlKey: true,
      shiftKey: true,
      metaKey: false,
      preventDefault,
    } as KeyboardEvent);
    expect(title.value).toBe("V");

    // Ctrl+Y: redo again (still V, no more future)
    handleKeydown({
      key: "y",
      ctrlKey: true,
      shiftKey: false,
      metaKey: false,
      preventDefault,
    } as KeyboardEvent);
    expect(title.value).toBe("V");
  });
});
