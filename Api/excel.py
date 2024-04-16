import pandas as pd

def excel_to_dataframe(file_path, sheet_name=None):
    """
    Convert Excel data into a Pandas DataFrame.

    Parameters:
    - file_path (str): Path to the Excel file.
    - sheet_name (str, optional): Name of the sheet to read. If not specified, reads the first sheet.

    Returns:
    - pd.DataFrame: Pandas DataFrame containing the Excel data.
    """
    try:
        # Read Excel file into a Pandas DataFrame
        if sheet_name:
            df = pd.read_excel(file_path, sheet_name=sheet_name)
        else:
            df = pd.read_excel(file_path)
        
        return df
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None

# Example usage:
file_path = "device.xlsx"
sheet_name = "Sheet1"  # Replace with the name of your sheet

data_frame = excel_to_dataframe(file_path, sheet_name)
if data_frame is not None:
    print("Excel data converted to Pandas DataFrame:")
    print(data_frame)
