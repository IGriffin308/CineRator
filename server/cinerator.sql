\echo 'Delete and recreate cinerator db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cinerator;
CREATE DATABASE cinerator;
\connect cinerator

\i cinerator-schema.sql
\i cinerator-seed.sql

\echo 'Delete and recreate cinerator_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cinerator_test;
CREATE DATABASE cinerator_test;
\connect cinerator_test

\i cinerator-schema.sql