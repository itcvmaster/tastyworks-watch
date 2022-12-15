<script>
// @ts-nocheck

    import { onDestroy } from "svelte";

    export let onClose;
    export let onOK;
    export let title;

    let modal;
    let value = "";

    const handle_keydown = (e) => {
        if (e.key === "Escape") {
            close();
            return;
        }

        if (e.key === "Tab") {
            // trap focus
            const nodes = modal.querySelectorAll("*");
            const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
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

<svelte:window on:keydown={handle_keydown} />

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
        <input bind:value={value} />
    </div>
    <div class="modal-footer">
        <button on:click={onClose}>Close</button>
        <button on:click={() => onOK(value)}>OK</button
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
		cursor: pointer;
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
        cursor: pointer;
        padding: 5px 10px;
    }
</style>
