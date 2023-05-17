using System.Globalization;
using FuelPrices.ORS.Models.Directions;

namespace FuelPrices.ORS.Client;

public class OrsClient : IOrsClient
{
    private const string BASE_URL = "http://localhost:8080";
    private const string DIRECTIONS = "/ors/v2/directions/driving-car";
    
    private readonly HttpClient _httpClient;

    public OrsClient(
        HttpClient httpClient
    )
    {
        _httpClient = httpClient;

        _httpClient.BaseAddress = new Uri(BASE_URL);
    }
    
    public async Task<DirectionsModel?> GetDirectionsAsync(GetDirectionsInputModel model)
    {
        var startLng = model.StartLng.ToString(CultureInfo.InvariantCulture);
        var startLat = model.StartLat.ToString(CultureInfo.InvariantCulture);
        var endLng = model.EndLng.ToString(CultureInfo.InvariantCulture);
        var endLat = model.EndLat.ToString(CultureInfo.InvariantCulture);
        
        var url = $"{DIRECTIONS}?start={startLng},{startLat}&end={endLng},{endLat}";

        var result = await GetAsync<DirectionsModel>(url);

        return result;
    }
    
    #region HTTP calls

    private async Task<T?> GetAsync<T>(string url)
    {
        var response = await _httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception();
        }

        var responseModel = await response.Content.ReadFromJsonAsync<T>();

        return responseModel;
    }
    
    #endregion
}

interface IOrsClient
{
    Task<DirectionsModel?> GetDirectionsAsync(GetDirectionsInputModel model);
}