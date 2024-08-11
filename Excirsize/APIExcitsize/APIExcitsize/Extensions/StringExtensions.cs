namespace APIExcitsize.Extensions
{
    public static class StringExtensions
    {

        public static string Red(this string value)
        {
            return $"\u001b[31m{value}\u001b[0m";
        }
        public static string Green(this string value)
        {
            return $"\u001b[32m{value}\u001b[0m";
        }
        public static string Yellow(this string value)
        {
            return $"\u001b[33m{value}\u001b[0m";
        }
        public static string Blue(this string value)
        {
            return $"\u001b[34m{value}\u001b[0m";
        }
        public static string Magenta(this string value)
        {
            return $"\u001b[35m{value}\u001b[0m";
        }
        public static string Cyan(this string value)
        {
            return $"\u001b[36m{value}\u001b[0m";
        }
        public static string BGRed(this string value)
        {
            return $"\u001b[41m{value}\u001b[0m";
        }
        public static string BGGreen(this string value)
        {
            return $"\u001b[42m{value}\u001b[0m";
        }
        public static string BGYellow(this string value)
        {
            return $"\u001b[43m{value}\u001b[0m";
        }
        public static string BGBlue(this string value)
        {
            return $"\u001b[44m{value}\u001b[0m";
        }
        public static string BGMagenta(this string value)
        {
            return $"\u001b[45m{value}\u001b[0m";
        }
        public static string BGCyan(this string value)
        {
            return $"\u001b[46m{value}\u001b[0m";
        }
    }
}
