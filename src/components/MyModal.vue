<template>
    <div>
        <div class="modal" v-if="show" @click.stop="hideModal">
            <div @click.stop class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'my-modal',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        showButton: {
            type: Boolean,
            default: false,
        },

    },
    data() {
        return {
            

        }
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false)
        }
    },
     watch: {
        showButton(newValue, oldValue) {
            console.log(newValue, oldValue);
        }
     },
}

</script>

<style>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    overflow: auto;
    z-index: 2008;

}

.modal__content {
    margin: auto;
    padding: 10px;
    display: flex;
    background: white;
    border-radius: 5px;
    min-height: 300px;
    min-width: 200px;
    flex-direction: column;
    width: 30%;
}
</style>