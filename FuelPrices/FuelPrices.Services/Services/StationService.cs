namespace FuelPrices.Services.Services;

public class StationService
{
    private readonly OrsService _orsService;

    public StationService(
        OrsService orsService
        )
    {
        _orsService = orsService;
    }

    public async Task<decimal> GetStationsAsync(float lat, float lng)
    {
        // TODO: retrieve stations
        
        // Calculate distance to stations
        var distance = await _orsService.GetDistanceAsync(
            lat,
            lng,
            51.52279429585205f,
            5.991575428556865f);

        return distance;
    }
}