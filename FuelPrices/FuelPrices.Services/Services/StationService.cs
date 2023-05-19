using FuelPrices.Services.Models.Fuel;
using FuelPrices.Services.Models.Station;

namespace FuelPrices.Services.Services;

public class StationService
{
    private readonly StationModel[] StationsData = new StationModel[]
    {
        new()
        {
            Name = "BP Vissers Venray",
            Latitude = 51.517742993032506f,
            Longitude = 5.979955533468089f,
            Fuels = new FuelModel[]
            {
                new()
                {
                    Name = "Euro 95",
                    Price = 1.755m
                },
                new()
                {
                    Name = "Diesel",
                    Price = 1.683m
                }
            }
        },
        new()
        {
            Name = "Esso Express Venray De Romein",
            Latitude = 51.524717719592054f,
            Longitude = 6.003957675829359f,
            Fuels = new FuelModel[]
            {
                new()
                {
                    Name = "Euro 95",
                    Price = 1.765m
                },
                new()
                {
                    Name = "Diesel",
                    Price = 1.693m
                }
            }
        },
        new()
        {
            Name = "Tango Venray",
            Latitude = 51.53971871574674f,
            Longitude = 5.986051564723382f,
            Fuels = new FuelModel[]
            {
                new()
                {
                    Name = "Euro 95",
                    Price = 1.775m
                },
                new()
                {
                    Name = "Diesel",
                    Price = 1.703m
                }
            }
        },
        new()
        {
            Name = "AVIA XPress Venray",
            Latitude = 51.51734642380499f,
            Longitude = 5.9687701585558175f,
            Fuels = new FuelModel[]
            {
                new()
                {
                    Name = "Euro 95",
                    Price = 1.745m
                },
                new()
                {
                    Name = "Diesel",
                    Price = 1.673m
                }
            }
        },
        new()
        {
            Name = "Van Gerver Venray BV",
            Latitude = 51.53030236287409f,
            Longitude = 5.978030323342983f,
            Fuels = new FuelModel[]
            {
                new()
                {
                    Name = "Euro 95",
                    Price = 1.735m
                },
                new()
                {
                    Name = "Diesel",
                    Price = 1.663m
                }
            }
        }
    };

    private readonly OrsService _orsService;

    public StationService(
        OrsService orsService
        )
    {
        _orsService = orsService;
    }

    public async Task<StationModel[]> GetStationsAsync(float lat, float lng)
    {
        // TODO: retrieve stations
        var stations = StationsData;

        foreach (var station in stations)
        {
            var distance = await _orsService.GetDistanceAsync(
                lat,
                lng,
                station.Latitude,
                station.Longitude);

            station.DistanceToStation = distance;
        }

        return stations;
    }
}