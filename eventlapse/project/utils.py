
import os

# Absolute path of the whole project "PicoLegends-Django" root directory.
ROOT_PATH = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def get_env_variable(var_name, default=False):
    """
    Get the environment variable or return exception
    :rtype : String
    :param var_name: Environment Variable to lookup
    """
    try:
        return os.environ[var_name]
    except KeyError:
        import StringIO
        import ConfigParser
        env_file = os.environ.get('PROJECT_ENV_FILE', ROOT_PATH + "/.env")
        try:
            config = StringIO.StringIO()
            config.write("[DATA]\n")
            config.write(open(env_file).read())
            config.seek(0, os.SEEK_SET)
            cp = ConfigParser.ConfigParser()
            cp.readfp(config)
            value = dict(cp.items('DATA'))[var_name.lower()]
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            os.environ.setdefault(var_name, value)
            return value
        except (KeyError, IOError):
            if default is not False:
                return default
            from django.core.exceptions import ImproperlyConfigured
            error_msg = "Either set the env variable '{var}' or place it in your " \
                        "{env_file} file as '{var} = VALUE'"
            raise ImproperlyConfigured(error_msg.format(var=var_name, env_file=env_file))
