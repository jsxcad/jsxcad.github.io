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
  const limits = (await IDB.get('limits')) || {};
  const requiredTags = new Set();
  for (const tag of Object.keys(limits)) {
    const { isRequired = false } = limits[tag];
    if (isRequired) {
      requiredTags.add(tag);
    }
  }
  return { limits, requiredTags };
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
  // console.log(`QQ/saveProblem: ${problem.id} ${problem.note}`);
  // saveNote(problem.id, problem.note);
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

export const generateProblemElement = ({ id = -1, generator, problem, solution, lines = 4, tags = [], note }) => {
  const e = document.createElement('div');
  e.classList.add('problem', 'tooltip');
  e.innerHTML =
    `
      <div class="tooltiptext">
        ${JSON.stringify(solution)}
      </div>
      <div class="generator">${generator}</div>
      ${problem}
    `;
  return e;
}

export const shuffle = (list) => {
  for (let nth = 0; nth < list.length; nth++) {
    const pick = Math.floor(Math.random() * (list.length - nth)) + nth;
    const temp = list[pick];
    list[pick] = list[nth];
    list[nth] = temp;
  }
  return list;
}
