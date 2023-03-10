DROP TYPE IF exists "TiposPagamentoEnum";
CREATE TYPE "TiposPagamentoEnum" as ENUM ('Dinheiro', 'Credito','Debito','PIX');

CREATE TABLE IF NOT EXISTS  "categorias" (
  "id" SERIAL NOT NULL,
  "nome" VARCHAR(100) NOT NULL,
  "descricao" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  "tipos_pagamento" (
  "id" SERIAL NOT NULL,
  "tipo" "TiposPagamentoEnum" NOT NULL
);

CREATE TABLE IF NOT EXISTS "estabelecimento" (
  "id" SERIAL NOT NULL,
  "cep" VARCHAR(8) NOT NULL,
  "numero" INTEGER NOT NULL,
  "lougradouro" VARCHAR(255),
  "bairro" VARCHAR(255),
  "uf" VARCHAR(2),
  "cidade" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS  "despesas" (
  "id" SERIAL NOT NULL,
  "valor" REAL NOT NULL,
  "descricao" VARCHAR(255) NOT NULL,
  "data_compra" TIMESTAMP(3) NOT NULL,
  "categoria_id" INTEGER NOT NULL,
  "tipo_pagamento_id" INTEGER NOT NULL,
  "estabelecimento_id" INTEGER NOT NULL
);


ALTER TABLE "categorias" ADD CONSTRAINT "categorias_pkey" PRIMARY KEY ("id");

ALTER TABLE "tipos_pagamento" ADD CONSTRAINT "tipos_pagamento_pkey" PRIMARY KEY ("id");

ALTER TABLE "despesas" ADD CONSTRAINT "despesas_pkey" PRIMARY KEY (id);

ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_pkey" PRIMARY KEY (id);

ALTER TABLE "despesas" ADD  CONSTRAINT "despesas_id_categorias_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "despesas" ADD  CONSTRAINT "despesas_id_tipo_pagamento_id_fkey" FOREIGN KEY ("tipo_pagamento_id") REFERENCES "tipos_pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "despesas" ADD  CONSTRAINT "despesas_id_estabelecimento_id_fkey" FOREIGN KEY ("estabelecimento_id") REFERENCES "estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO public.tipos_pagamento (tipo) VALUES
('Dinheiro'),
('Credito'),
('Debito'),
('PIX');
