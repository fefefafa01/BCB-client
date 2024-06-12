<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import FormControlIcon from '@/components/customer/FormControlIcon.vue';

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: null
  },
  maxlength: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  inputmode: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  required: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  ctrlKFocus: Boolean
});

const emit = defineEmits(['update:modelValue', 'setRef']);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const inputElClass = computed(() => {
  const base = [
    'px-3 py-3 max-w-full focus:ring focus:ring-customBgHover focus:ring-inset focus:outline-none focus:border-none border-customBgHover rounded w-full',
    computedType.value === 'textarea' ? 'h-24' : 'h-12',
    props.borderless ? 'border-0' : 'border',
    props.transparent ? 'bg-transparent' : 'bg-white'
  ];
  if (props.icon) {
    base.push('pl-10');
  }
  return base;
});

const computedType = computed(() => (props.options ? 'select' : props.type));
const controlIconH = computed(() => (props.type === 'textarea' ? 'h-full' : 'h-12'));
const selectEl = ref(null);
const textareaEl = ref(null);
const inputEl = ref(null);
</script>

<template>
  <div class="relative">
    <select
      v-if="computedType === select"
      :name="name"
      :id="id"
      v-model="computedValue"
      :class="inputElClass"
    >
      <option v-for="option in options" :key="option.id ?? option" :value="option">
        {{ option.value ?? option }}
      </option>
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      :name="name"
      :id="id"
      v-model="computedValue"
      :class="inputElClass"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
    />
    <input
      v-else
      :type="computedType"
      :id="id"
      ref="inputEl"
      v-model="computedValue"
      :name="name"
      :maxLength="maxLength"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :require="require"
      :placeholder="placeholder"
      :class="inputElClass"
    />
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
  </div>
</template>
