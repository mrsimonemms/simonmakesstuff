FROM gitpod/workspace-full
RUN bash -c "source $HOME/.nvm/nvm.sh \
  && nvm install --lts \
  && nvm use --lts \
  && nvm alias default $(node --version | sed 's/v//') \
  && echo "nvm use default" > ~/.bashrc.d/51-nvm-fix"
RUN curl -sfL gpm.simonemms.com | bash \
  && gpm install pre-commit \
  && npx playwright install --with-deps < /dev/null
