<script>
// @ts-nocheck

    import { onDestroy } from "svelte";
    import { userStore } from "$lib/store";
    import { Actions } from "$lib/store/actions";

    let user = {};
    let unsubscribe = userStore.subscribe(u => user = u);

    let first = "";
    let last = "";

    const handleClick = () => {
        if (!first.trim()) {
            alert("First name should not be empty");
            return;
        }

        if (!last.trim()) {
            alert("First name should not be empty");
            return;
        }

        userStore.dispatch({
            type: Actions.CREATE_USER,
            payload: {
                first: first,
                last: last
            }
        });
    }

    onDestroy(unsubscribe);

</script>

<svelte:head>
    <title>Log in</title>
    <meta name="Login" content="Log in to an account" />
</svelte:head>

<div class="container">
    <form id="user-from" on:submit|preventDefault={handleClick}>
        <h1>Please input a user name below</h1>

        <div class="user-field">
            <label for={first}>First Name:</label>
            <input type=string bind:value={first} />    
        </div>
        <div class="user-field">
            <label for={last}>Last Name:</label>
            <input type=string bind:value={last} />    
        </div>
        <input type="submit" class="submit" value="Log in" />
    </form>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 500px;
    }
    .user-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        width: 100%;
    }

    input{
        height: 50px;
        background-color: rgba(255,255,255,0.07);
        border-radius: 13px;
        padding: 0 10px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 300;
    }

    .submit {
        margin-top: 50px;
        width: 100%;
        background-color: #ffffff;
        color: #080710;
        padding: 15px 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 15px;
    }
</style>