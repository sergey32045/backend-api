yarn run typeorm migration:revert
yarn run typeorm:db:migrate -d ormconfig.ts
yarn run typeorm migration:create migrations/AddPositionsTable