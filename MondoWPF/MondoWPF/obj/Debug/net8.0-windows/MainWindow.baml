   M S B A M L   `   `   `  ����C  ?MondoWPF, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null#clr-namespace:MondoWPFMondoWPF  5   	       MondoWPF.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   (localclr-namespace:MondoWPF     5   	     � Title$  
MainWindow��5   	   $	��450��6   $	��800��6)   .��5	      �  � RowDefinitions 5
   
   �� 5      $
��0.1* �6   �� 5      $
��auto �6   �� 5      �� 5      �� 5      �� 5      $
��0.1* �6    � ColumnDefinitions 5   
   �� 5      �� 5      �� 5      �� 5      �� 5      .+�5   
   �� $��Table��6   $��1��6    $��1��60   $��25(�6=   $��
ExtraBlack"�6K   &   System.Windows.Controls.DataGrid  5   
   -   5        $��myTable��5      $��1��6"   $��2��62      AutoGenerateColumns$
 True��6?   $��3��6Z   $��10q�6n   �� 5   
   $��ID��6   $��0��6   $��3��6-   $��25(�6:   $��
ExtraBlack"�6H   $	��Top=�6`   $��10q�6x   �� 5   
   $
��Name��6   $��1��6   $��3��6/   $��25(�6<   $��
ExtraBlack"�6J   $	��Top=�6b   $��10q�6z   �� 5   
   $��Sirname��6   $��2��6"   $��3��62   $��25(�6?   $��
ExtraBlack"�6M   $	��Top=�6e   $��10q�6}   �� 5   
   $��Address��6   $��3��6"   $��3��62   $��25(�6?   $��
ExtraBlack"�6M   $	��Top=�6e   $��10q�6}   �� 5   
   -   5        $��Input_ID��5      $��0��6"   $��3��62   $��25(�6?   $��
ExtraBlack"�6M   $��Bottom=�6e   $��10q�6�   �� 5    
   -   5        $��
Input_Name��5       $��1��6$   $��3��64   $��25(�6A   $��
ExtraBlack"�6O   $��Bottom=�6g   $��10q�6�   �� 5!   
   -   5        $��Input_Sirname��5!      $��2��6'   $��3��67   $��25(�6D   $��
ExtraBlack"�6R   $��Bottom=�6j   $��10q�6�   �� 5"   
   -   5        $��Input_Address��5"      $��3��6'   $��3��67   $��25(�6D   $��
ExtraBlack"�6R   $��Bottom=�6j   $��10q�6�   �� 5#   
   -   5        $��Add User��5#      $��4��6$   $��3��64   $��25(�6A   $��
ExtraBlack"�6O   $��Bottom=�6g   $��10q�6�   6�   �� 5$   
   -   5        $��Update User��5$      $��4��6'   $��3��67   $��25(�6D   $��
ExtraBlack"�6R   $	��TOP=�6j   $��10q�6�   6�   �� 5%   
   -   5        $��Get User��5%      $��0��6$   $��4��64   $��25(�6A   $��
ExtraBlack"�6O   $	��TOP=�6g   $��10q�6   6�   �� 5&   
   -	   5        $��Delete User��5&      $��0��6'   $��4��67   $��25(�6D   $��
ExtraBlack"�6R   $��Bottom=�6j   $��10q�6�   6�   �� 5'   
   -
   5        $��Get all users��5'      $��2��6)   $��4��69   $��25(�6F   $��
ExtraBlack"�6T   $��Bottom=�6l   $��10q�6�   6�   �� 5(   
   -   5        $��Get user by name��5(      $��1��6,   $��4��6<   $��18(�6I   $��
ExtraBlack"�6W   $��Bottom=�6o   $��10q�6�   6�   5)      5*      