<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/** 
 * As configurações básicas do WordPress.
 *
 * Esse arquivo contém as seguintes configurações: configurações de MySQL, Prefixo de Tabelas,
 * Chaves secretas, Idioma do WordPress, e ABSPATH. Você pode encontrar mais informações
 * visitando {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. Você pode obter as configurações de MySQL de seu servidor de hospedagem.
 *
 * Esse arquivo é usado pelo script ed criação wp-config.php durante a
 * instalação. Você não precisa usar o site, você pode apenas salvar esse arquivo
 * como "wp-config.php" e preencher os valores.
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar essas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define('DB_NAME', 'clinicaaca2');

/** Usuário do banco de dados MySQL */
define('DB_USER', 'clinicaaca2');

/** Senha do banco de dados MySQL */
define('DB_PASSWORD', '@c@ll@nto2013');

/** nome do host do MySQL */
define('DB_HOST', 'dbmy0049.whservidor.com');

/** Conjunto de caracteres do banco de dados a ser usado na criação das tabelas. */
define('DB_CHARSET', 'utf8');

/** O tipo de collate do banco de dados. Não altere isso se tiver dúvidas. */
define('DB_COLLATE', '');

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Você pode alterá-las a qualquer momento para desvalidar quaisquer cookies existentes. Isto irá forçar todos os usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'b#>ekfa<B@iwo7K@vh/`ya+4. ]|f6K_?LJh]_/#{8{k%LCa;lBn`!*~v}jWT16h');
define('SECURE_AUTH_KEY',  'SXw#Y]KV@Js!HST|ulUwg.Ro&Xc*L]g;Dk $}nrS{:Wni!R_kdD`N,A5|+^trgAu');
define('LOGGED_IN_KEY',    '6wd7=&>-c,[-=_91QKqNoALJ(dc^3Dy1yS kt0XKrmTRVbq<$S+AfQeQ~uamb>V(');
define('NONCE_KEY',        'Ii;PF2A# (7TbwMza&2^p]D=[0 U*rsO{CBXV?b=Nyle|Y1sIgP=X3=|[1~3RMV/');
define('AUTH_SALT',        'fRrap80{*ghWyq|c#br*[1ib[T, {J0w7#$RqqN/@U|]o#V8sE`l.ND5cKjrZDYc');
define('SECURE_AUTH_SALT', ' cXeilOZsFgPWs@SYi9F|5:|Oo(!-5TC3E3uqS-@KQfZOtt?>wO2b30M={}3M<OM');
define('LOGGED_IN_SALT',   '1.dJ fpg=c_|].vf2@!-nE]{`3w!-Ap?z9CWU|b}G0M8;RH%Vf)i:uvahN|C|[+g');
define('NONCE_SALT',       'wQu,XS6VH4X`tcUbe[Lm$E;`n>#:b8Z YAco3y+z2&UO3zQkiB|!:wu(Dk!P+v,V');

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der para cada um um único
 * prefixo. Somente números, letras e sublinhados!
 */
$table_prefix  = 'wp_';

/**
 * O idioma localizado do WordPress é o inglês por padrão.
 *
 * Altere esta definição para localizar o WordPress. Um arquivo MO correspondente ao
 * idioma escolhido deve ser instalado em wp-content/languages. Por exemplo, instale
 * pt_BR.mo em wp-content/languages e altere WPLANG para 'pt_BR' para habilitar o suporte
 * ao português do Brasil.
 */
define('WPLANG', 'pt_BR');

/**
 * Para desenvolvedores: Modo debugging WordPress.
 *
 * altere isto para true para ativar a exibição de avisos durante o desenvolvimento.
 * é altamente recomendável que os desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 */
define('WP_DEBUG', false);

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
	
/** Configura as variáveis do WordPress e arquivos inclusos. */
require_once(ABSPATH . 'wp-settings.php');
