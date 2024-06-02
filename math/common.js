import * as IDB from 'https://cdnjs.cloudflare.com/ajax/libs/idb-keyval/6.2.1/compat.min.js';
import { problems } from './problems.js';

export const loadNote = async (key) => {
  const value = await IDB.get(key);
  if (value === undefined) {
    return {};
  } else {
    return value;
  }
};

export const loadTags = async () => {
  const weights = (await IDB.get('weights')) || {};
  const requiredTags = new Set();
  for (const tag of Object.keys(weights)) {
    const { isRequired = false } = weights[tag];
    if (isRequired) {
      requiredTags.add(tag);
    }
  }
  return { weights, requiredTags };
};
    
export const loadProblems = async () => {
  for (const problem of problems) {
    problem.note = await loadNote(problem.id);
    if (problem.note.weight === undefined) {
      problem.note.weight = 1;
    }
  }
  return problems;
}

export const saveNote = async (key, value) => IDB.set(key, value);

export const saveProblem = async (problem) => {
  console.log(`QQ/saveProblem: ${problem.id} ${problem.note}`);
  saveNote(problem.id, problem.note);
}

export const renderRuledLine = () => {
  const div = document.createElement('div');
  div.innerHTML = `
    <svg width="100%" height="30" viewBox="0 0 4 30" preserveAspectRatio="none">
      <path stroke="black" stroke-opacity="0.25" d="M 0 10 L 4 10"/>
      <path stroke="black" stroke-opacity="0.25" d="M 0 15 L 4 15"/>
      <path stroke="black" stroke-opacity="0.50" d="M 0 25 L 4 25"/>
      <path stroke="black" stroke-opacity="0.25" d="M 0 30 L 4 30"/>
    </svg>`;
  return div;
};

export const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const renderProblem = ({ id = -1, generator, problem, solution, lines = 4, tags = [], note }) => {
  const div = document.createElement('div');
  div.classList.add('problem', 'tooltip');
  let pre = '';
  let post = '';
  if (generator === 'javascript-program') {
    pre = '<pre>';
    post = '</pre>';
  }
  div.innerHTML = `${pre}${problem.split('\n').map((text) => escapeHtml(text)).join('<br>')}${post}`;
  for (let line = 0; line < lines; line++) {
    div.appendChild(renderRuledLine());
  }
  const span = document.createElement('div')
  span.innerText = generator;
  span.classList.add('generator');

  const shields = document.createElement('div')
  shields.innerItext = note.weight;
  shields.classList.add('shields');

  div.insertBefore(span, div.firstChild);
  const hint = document.createElement('div');
  hint.innerHTML = `${id}<br>${solution}<br>${tags.join(', ')}`;
  hint.classList.add('tooltiptext');
  div.appendChild(hint);
  return div;
};
