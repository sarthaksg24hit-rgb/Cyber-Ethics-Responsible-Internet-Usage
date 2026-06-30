const fs = require('fs');
const file = 'src/pages/TopicDetail/TopicDetail.css';
let content = fs.readFileSync(file, 'utf8');

const tableCSS = `
/* Table Styles */
.table-responsive {
  overflow-x: auto;
  margin-top: 16px;
}

.notes-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

.notes-table th {
  background: var(--bg-glass);
  color: var(--accent-blue);
  padding: 16px;
  font-weight: 600;
  border-bottom: 2px solid var(--border-glass-hover);
}

.notes-table td {
  padding: 16px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-glass);
  line-height: 1.5;
}

.notes-table tr:last-child td {
  border-bottom: none;
}

.notes-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}
`;

fs.writeFileSync(file, content + tableCSS);
console.log('Appended table CSS');
