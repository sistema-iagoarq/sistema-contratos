-- ============================================================
--  Ajuste: remove campos de canal de envio da tabela proposals.
--  Motivo: seção "Canal de Envio" foi retirada do formulário de
--  nova proposta; colunas não são mais usadas pela aplicação.
-- ============================================================

alter table proposals
  drop column if exists send_channel_email,
  drop column if exists send_channel_whatsapp,
  drop column if exists send_channel_signature_link;
