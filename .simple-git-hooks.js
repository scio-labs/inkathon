module.exports = {
  'pre-commit': `
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

pnpm lint-staged
  `,
}
