using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows;

namespace MondoWPF
{
    internal class FoolProofing
    {

        public static bool CheckCellFilled(TextBox textBox)
        {
            if (textBox == null) return false;
            if (string.IsNullOrEmpty(textBox.Text)) return false;
            if (string.IsNullOrWhiteSpace(textBox.Text)) return false;
            return true;
        }

        public static bool CheckCellsFilled(List<TextBox> textBoxs)
        {
            foreach (TextBox textbox in textBoxs)
            {
                if (!CheckCellFilled(textbox))
                {
                    MessageBox.Show($"{textbox.Name} text box must be filled", "Missing input");
                    return false;
                }

            }
            return true;
        }

        public static void ClearTextBoxes(List<TextBox> textBoxs)
        {
            foreach (TextBox textbox in textBoxs)
            {
                textbox.Text = "";
            }
        }

        public static List<string> GetTextOfTextBoxes(List<TextBox> textBoxs)
        {
            List<string> strings = new List<string>();
            foreach (TextBox textBox in textBoxs)
            {
                strings.Add(textBox.Text.Trim());
            }
            return strings;
        }
    }
}
