DROP FUNCTION IF EXISTS drop_table_like(varchar);
CREATE OR REPLACE FUNCTION drop_table_like(expression varchar)
RETURNS void
  AS $$
  DECLARE
    _q text;
    _s text;
    _r record;
    _d timestamp;
  BEGIN
    _q := format('select distinct table_name from information_schema.tables where table_name like ''%%%s%%''', expression);
    FOR _r IN EXECUTE _q  LOOP
      _s = format('drop table %s', _r.table_name);
      EXECUTE _s;
    END LOOP;

  END
  $$ LANGUAGE plpgsql;

-- SELECT drop_table_like('distrito_telefonica');