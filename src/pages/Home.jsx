import React, { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { EventCard } from '../components/EventCard'
import { CategoryFilter } from '../components/CategoryFilter'
import { EventDetailModal } from '../components/EventDetailModal'
import { RSVPModal } from '../components/RSVPModal'
import { eventsData } from '../api/DummyData'
import FilterByDate from '../components/FilterByDate'
import FilterByState from '../components/FilterByState'
import { Button } from '../components/ui/Button'
import { Loader2 } from 'lucide-react'

const Home = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpEventTitle, setRSVPEventTitle] = useState("");
  const [events, setEvents] = useState(eventsData)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);


  const categories = ["All", "Fitness", "Music", "Sports", "Meetup", "Workshop", "Social", "Entertainment"];

  const uniqueLocations = eventsData.map(item => item.location);
  const locations = [...new Set(uniqueLocations)];
  const availableDates = eventsData.map(item => item.date).sort((a, b) => new Date(a) - new Date(b));

  const filteredEvents = useMemo(() => {
    const formatted = selectedDate
      ? selectedDate.toLocaleDateString("en-CA") // ✅ local format YYYY-MM-DD
      : null;

    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.host.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes("All") ||
        selectedCategories.includes(event.type);

      const matchesDate =
        !selectedDate || event.date === formatted;

      const matchesLocation =
        selectedStates.length === 0 || selectedStates.includes(event.location);

      return matchesSearch && matchesCategory && matchesDate && matchesLocation;
    });
  }, [events, searchQuery, selectedCategories, selectedDate, selectedStates]);


  const handleJoinEvent = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
            ...e,
            isJoined: !e.isJoined,
            attendees: e.isJoined ? e.attendees - 1 : e.attendees + 1,
          }
          : e
      )
    );

    if (!event.isJoined) {
      setRSVPEventTitle(event.title);
      setShowRSVPModal(true);
    }
    setSelectedEvent(null);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoading(false);
    }, 1000); //1 second delay
  };




  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/30'>

      <section className="relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src={"/hero-banner.jpg"}
            alt="Community Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/80" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="text-center text-white space-y-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing
              <br />
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                Local Events
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Connect with your community, learn new skills, and create lasting memories
            </p>
          {/* SearchBar  */}
            <div className="pt-4 animate-slide-up">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Find events near you..."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Browse by Category
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center my-6">
            Filter By Date & Locaions
          </h2>

          {/* filter by date and locations */}
          <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-x-4 gap-y-4 md:gap-y-0'>
            <FilterByDate
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            <FilterByState
              locations={locations}
              selectedStates={selectedStates}
              onStateChange={setSelectedStates}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />

          </div>
          <div className='flex justify-center items-center my-6'>
            <Button className="w-full max-w-[600px]" onClick={() => { setSelectedDate(null); setSelectedStates([]) }}>Clear Filters</Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery || selectedCategories.length > 0 ? 'Search Results' : 'Upcoming Events'}
            </h2>
            <span className="text-muted-foreground">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.slice(0, visibleCount).map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EventCard
                      event={event}
                      onEventClick={setSelectedEvent}
                      onJoinEvent={handleJoinEvent}
                    />
                  </div>
                ))}
              </div>

              {visibleCount < filteredEvents.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    className="flex items-center gap-2"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No events found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Modals */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onJoinEvent={handleJoinEvent}
      />

      {/* Rsvp Modal  */}
      <RSVPModal
        isOpen={showRSVPModal}
        eventTitle={rsvpEventTitle}
        onClose={() => setShowRSVPModal(false)}
      />


    </div>
  )
}

export default Home