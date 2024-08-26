FROM node:20.12.2

COPY --from=builder /app /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /utilities /utilities

WORKDIR /app

CMD ["npm", "run", "dev:local:docker"]
