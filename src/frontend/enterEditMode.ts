export function enterEditMode(
  postId: string,
  blogTitle: HTMLInputElement,
  blogText: HTMLTextAreaElement,
  blogId: HTMLInputElement,
  submitBtn: HTMLButtonElement
) {
  const titleEl = document.querySelector(`[data-title="${postId}"]`);
  const textEl = document.querySelector(`[data-text="${postId}"]`);

  if (!titleEl || !textEl) return;

  blogTitle.value = titleEl.innerHTML;
  blogText.value = textEl.innerHTML;
  blogId.value = postId;

  submitBtn.setAttribute("data-submit-type", "edit");
  submitBtn.innerText = "Save Post";
}
