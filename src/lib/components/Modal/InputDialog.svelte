<script>
// @ts-nocheck

    import { onMount, onDestroy } from "svelte";

    export let onClose;
    export let onOK;
    export let title;

    let inputRef;
    let modal;
    let value = "";

    onMount(() => inputRef.focus());
    
    const handleInput = () => {
        if (!value.trim()) {
            value = "";
            inputRef.focus();
            return;
        }

        onOK(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
    };

    const previously_focused =
        typeof document !== "undefined" && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
</script>

<svelte:window on:keydown|stopPropagation={handleKeyDown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-background" on:click={close} />
<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <div class="modal-header">
        <div class="modal-title">{title}</div>
        <button
            class="close"
            on:click={onClose}
        >
            &times;
        </button>
    </div>
    <div class="modal-body">
        <input 
            bind:this={inputRef} 
            bind:value={value} 
            placeholder="Input non-empty string"
        />
    </div>
    <div class="modal-footer">
        <button on:click={onClose}>Close</button>
        <button on:click={handleInput}>OK</button
        >
    </div>
</div>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4em);
        max-width: 32em;
        max-height: calc(100vh - 4em);
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1em;
        border-radius: 0.2em;
        background: white;
    }

    .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(0.3rem - 1px);
        border-top-right-radius: calc(0.3rem - 1px);
    }

    .modal-title {
        font-size: 1.25rem;
        margin-bottom: 0;
        line-height: 1.5;
    }

    .close {
        float: right;
        font-size: 24px;
        font-weight: 700;
        color: rgba(0,0,0, 0.5);
        background-color: transparent;
        border: 0;
        margin: -16px -16px -16px auto;
    }

    .modal-body {
        display: flex;
        position: relative;
        flex: 1 1 auto;
        padding: 16px;
    }

    .modal-footer {
        gap: 10px;
        border-top: 1px solid #dee2e6;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        padding: 0.75rem;
        border-bottom-right-radius: calc(0.3rem - 1px);
        border-bottom-left-radius: calc(0.3rem - 1px);
    }
    input {
        padding: 8px;
        width: 100%;
    }
    button {
        padding: 5px 10px;
    }
</style>
