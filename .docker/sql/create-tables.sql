DROP TYPE IF exists "TiposPagamentoEnum";
CREATE TYPE "TiposPagamentoEnum" as ENUM ('Dinheiro', 'Credito','Debito','PIX');

CREATE TABLE IF NOT EXISTS  "categorias" (
  "id" INTEGER NOT NULL,
  "nome" VARCHAR(100) NOT NULL,
  "descricao" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  "tipos_pagamento" (
  "id" INTEGER NOT NULL,
  "tipo" "TiposPagamentoEnum" NOT NULL
);

CREATE TABLE IF NOT EXISTS  "despesas" (
  "id" INTEGER NOT NULL,
  "valor" REAL NOT NULL,
  "data_compra" TIMESTAMP(3) NOT NULL,
  "categoria_id" INTEGER NOT NULL,
  "tipos_pagamento_id" INTEGER NOT NULL
);


ALTER TABLE "categorias" ADD CONSTRAINT "categorias_pkey" PRIMARY KEY ("id");

ALTER TABLE "tipos_pagamento" ADD CONSTRAINT "tipos_pagamento_pkey" PRIMARY KEY ("id");

ALTER TABLE "despesas" ADD CONSTRAINT "despesas_pkey" PRIMARY KEY (id);

ALTER TABLE "despesas" ADD  CONSTRAINT "despesas_id_categorias_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "despesas" ADD  CONSTRAINT "despesas_id_tipos_pagamento_id_fkey" FOREIGN KEY ("tipos_pagamento_id") REFERENCES "tipos_pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


