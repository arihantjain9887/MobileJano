from flask import Flask, render_template, request, Response
from bs4 import BeautifulSoup
import requests
import pandas as pd
import time

app = Flask(__name__)

def scrape_gsmarena(base_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US, en;q=0.5'
    }

    webpage = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(webpage.content, 'html.parser')

    ul_tag = soup.find('ul', class_='quick-specs')
    h1_tag = soup.find('h1', class_='section nobor')
    network_tech_tag = soup.find('td', {'data-spec': 'nettech'})
    network_table = soup.find('table', {'data-spec': 'net'})
    announced_tag = soup.find('td', {'data-spec': 'year'})
    status_tag = soup.find('td', {'data-spec': 'status'})
    dimensions_tag = soup.find('td', {'data-spec': 'dimensions'})
    weight_tag = soup.find('td', {'data-spec': 'weight'})
    build_tag = soup.find('td', {'data-spec': 'build'})
    sim_tag = soup.find('td', {'data-spec': 'sim'})
    body_other_tag = soup.find('td', {'data-spec': 'bodyother'})
    display_type_tag = soup.find('td', {'data-spec': 'displaytype'})
    display_size_tag = soup.find('td', {'data-spec': 'displaysize'})
    resolution_tag = soup.find('td', {'data-spec': 'displayresolution'})
    protection_tag = soup.find('td', {'data-spec': 'displayprotection'})
    display_other_tag = soup.find('td', {'data-spec': 'displayother'})
    os_tag = soup.find('td', {'data-spec': 'os'})
    chipset_tag = soup.find('td', {'data-spec': 'chipset'})
    cpu_tag = soup.find('td', {'data-spec': 'cpu'})
    gpu_tag = soup.find('td', {'data-spec': 'gpu'})
    wlan_tag = soup.find('td', {'data-spec': 'wlan'})
    bluetooth_tag = soup.find('td', {'data-spec': 'bluetooth'})
    gnss_tag = soup.find('td', {'data-spec': 'gps'})
    card_slot_tag = soup.find('td', {'data-spec': 'memoryslot'})
    internal_memory_tag = soup.find('td', {'data-spec': 'internalmemory'})
    internal_memory_other_tag = soup.find('td', {'data-spec': 'internalmemoryother'})
    camera_tag = soup.find('td', {'data-spec': 'cam1modules'})
    camera_features_tag = soup.find('td', {'data-spec': 'cam1features'})
    camera_video_tag = soup.find('td', {'data-spec': 'cam1video'})
    secondary_camera_tag = soup.find('td', {'data-spec': 'cam2modules'})
    secondary_camera_features_tag = soup.find('td', {'data-spec': 'cam2features'})
    secondary_camera_video_tag = soup.find('td', {'data-spec': 'cam2video'})
    loudspeaker_tag = soup.find('td', {'data-spec': 'loudspeaker'})
    audio_jack_tag = soup.find('td', {'data-spec': 'audiojack'})
    optional_other_tag = soup.find('td', {'data-spec': 'optionalother'})
    nfc_tag = soup.find('td', {'data-spec': 'nfc'})
    radio_tag = soup.find('td', {'data-spec': 'radio'})
    usb_tag = soup.find('td', {'data-spec': 'usb'})
    sensors_tag = soup.find('td', {'data-spec': 'sensors'})
    features_other_tag = soup.find('td', {'data-spec': 'featuresother'})
    battery_type_tag = soup.find('td', {'data-spec': 'batdescription1'})
    charging_tag = soup.find('td', {'data-spec': 'charging'})
    colors_tag = soup.find('td', {'data-spec': 'colors'})
    models_tag = soup.find('td', {'data-spec': 'models'})
    sar_us_tag = soup.find('td', {'data-spec': 'sar-us'})
    sar_eu_tag = soup.find('td', {'data-spec': 'sar-eu'})
    price_tag = soup.find('td', {'data-spec': 'price'})
    performance_tag = soup.find('td', {'data-spec': 'tbench'})
    display_test_tag = soup.find('td', {'data-spec': 'dt'})
    camera_test_tag = soup.find('td', {'data-spec': 'ct'})
    loudspeaker_test_tag = soup.find('td', {'data-spec': 'lt'})
    battery_test_tag = soup.find('td', {'data-spec': 'batlife2'})

    if ul_tag:
        li_tags = ul_tag.find_all('li', class_='head-icon')

        data_dict = {
            'URL': base_url,
            'H1 Text': h1_tag.text.strip() if h1_tag else '',
            'Network Technology': network_tech_tag.text.strip() if network_tech_tag else '',
            'Announced': announced_tag.text.strip() if announced_tag else '',
            'Status': status_tag.text.strip() if status_tag else '',
            'Dimensions': dimensions_tag.text.strip() if dimensions_tag else '',
            'Weight': weight_tag.text.strip() if weight_tag else '',
            'Build': build_tag.text.strip() if build_tag else '',
            'SIM': sim_tag.text.strip() if sim_tag else '',
            'Body Other': body_other_tag.text.strip() if body_other_tag else '',
            'Display Type': display_type_tag.text.strip() if display_type_tag else '',
            'Display Size': display_size_tag.text.strip() if display_size_tag else '',
            'Resolution': resolution_tag.text.strip() if resolution_tag else '',
            'Protection': protection_tag.text.strip() if protection_tag else '',
            'Display Other': display_other_tag.text.strip() if display_other_tag else '',
            'OS': os_tag.text.strip() if os_tag else '',
            'Chipset': chipset_tag.text.strip() if chipset_tag else '',
            'CPU': cpu_tag.text.strip() if cpu_tag else '',
            'GPU': gpu_tag.text.strip() if gpu_tag else '',
            'WLAN': wlan_tag.text.strip() if wlan_tag else '',
            'Bluetooth': bluetooth_tag.text.strip() if bluetooth_tag else '',
            'GNSS': gnss_tag.text.strip() if gnss_tag else '',
            'Card Slot': card_slot_tag.text.strip() if card_slot_tag else '',
            'Internal Memory': internal_memory_tag.text.strip() if internal_memory_tag else '',
            'Internal Memory Other': internal_memory_other_tag.text.strip() if internal_memory_other_tag else '',
            'Camera': camera_tag.text.strip() if camera_tag else '',
            'Camera Features': camera_features_tag.text.strip() if camera_features_tag else '',
            'Camera Video': camera_video_tag.text.strip() if camera_video_tag else '',
            'Secondary Camera': secondary_camera_tag.text.strip() if secondary_camera_tag else '',
            'Secondary Camera Features': secondary_camera_features_tag.text.strip() if secondary_camera_features_tag else '',
            'Secondary Camera Video': secondary_camera_video_tag.text.strip() if secondary_camera_video_tag else '',
            'Loudspeaker': loudspeaker_tag.text.strip() if loudspeaker_tag else '',
            'Audio Jack': audio_jack_tag.text.strip() if audio_jack_tag else '',
            'Optional Other': optional_other_tag.text.strip() if optional_other_tag else '',
            'NFC': nfc_tag.text.strip() if nfc_tag else '',
            'Radio': radio_tag.text.strip() if radio_tag else '',
            'USB': usb_tag.text.strip() if usb_tag else '',
            'Sensors': sensors_tag.text.strip() if sensors_tag else '',
            'Features Other': features_other_tag.text.strip() if features_other_tag else '',
            'Battery Type': battery_type_tag.text.strip() if battery_type_tag else '',
            'Charging': charging_tag.text.strip() if charging_tag else '',
            'Colors': colors_tag.text.strip() if colors_tag else '',
            'Models': models_tag.text.strip() if models_tag else '',
            'SAR US': sar_us_tag.text.strip() if sar_us_tag else '',
            'SAR EU': sar_eu_tag.text.strip() if sar_eu_tag else '',
            'Price': price_tag.text.strip() if price_tag else '',
            'Performance': performance_tag.text.strip() if performance_tag else '',
            'Display Test': display_test_tag.text.strip() if display_test_tag else '',
            'Camera Test': camera_test_tag.text.strip() if camera_test_tag else '',
            'Loudspeaker Test': loudspeaker_test_tag.text.strip() if loudspeaker_test_tag else '',
            'Battery Test': battery_test_tag.find('a')['data-battery2'] if battery_test_tag else ''
        }

 # Add network information
        if network_table:
            for row in network_table.find_all('tr', class_='tr-toggle'):
                category = row.find('td', class_='ttl').text.strip()
                value = row.find('td', class_='nfo').text.strip()
                data_dict[category] = value

        for index, li_tag in enumerate(li_tags, start=1):
            strong_tag = li_tag.find('strong')
            data_dict[f'display_size_{index}'] = strong_tag.find('span', {'data-spec': 'displaysize-hl'}).text.strip() if strong_tag and strong_tag.find('span', {'data-spec': 'displaysize-hl'}) else ''
            data_dict[f'display_res_{index}'] = li_tag.find('span', {'data-spec': 'displayres-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'displayres-hl'}) else ''
            data_dict[f'camerapixels_{index}'] = li_tag.find('span', {'data-spec': 'camerapixels-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'camerapixels-hl'}) else ''
            data_dict[f'videopixels_{index}'] = li_tag.find('span', {'data-spec': 'videopixels-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'videopixels-hl'}) else ''
            data_dict[f'ramsize_{index}'] = li_tag.find('span', {'data-spec': 'ramsize-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'ramsize-hl'}) else ''
            data_dict[f'chipset_{index}'] = li_tag.find('span', {'data-spec': 'chipset-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'chipset-hl'}) else ''
            data_dict[f'batsize_{index}'] = li_tag.find('span', {'data-spec': 'batsize-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'batsize-hl'}) else ''
            data_dict[f'battype_{index}'] = li_tag.find('span', {'data-spec': 'battype-hl'}).text.strip() if li_tag.find('span', {'data-spec': 'battype-hl'}) else ''

        return data_dict

    print(f"No data found for URL: {base_url}")
    return {}

def store_in_excel(data_dict_list, output_file):
    df = pd.DataFrame(data_dict_list)
    df.to_excel(output_file, index=False)

@app.route('/', methods=['GET'])
def index():
    input_csv = "link.csv"
    output_excel = "device.xlsx"

    base_urls_df = pd.read_csv(input_csv)
    base_urls = base_urls_df['BaseURL'].tolist()
    base_urls = ["https://m.gsmarena.com/" + url for url in base_urls]

    all_data_dict_list = []

    def generate_data():
        for base_url in base_urls:
            data_dict = scrape_gsmarena(base_url)
            if data_dict:
                all_data_dict_list.append(data_dict)
                yield f"data: {data_dict}\n\n"
                store_in_excel(all_data_dict_list, output_excel)
            time.sleep(1)  # Adjust the delay as needed

    response = Response(generate_data(), content_type='text/event-stream')
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['Connection'] = 'keep-alive'
    return response

if __name__ == '__main__':
    app.run(debug=True, threaded=True)